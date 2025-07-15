import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: any;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

interface WordPressError {
  message: string;
  code?: string;
}

interface WooMetaData {
  id?: number;
  key: string;
  value: any;
}

type AxiosError = {
  response?: {
    data?: WordPressError;
  };
  message: string;
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    (error as any).response !== undefined
  );
};

// Get WordPress credentials from environment variables
const DEFAULT_SITE_URL = process.env.WORDPRESS_SITE_URL || "";
const DEFAULT_USERNAME = process.env.WORDPRESS_USERNAME || "";
const DEFAULT_PASSWORD = process.env.WORDPRESS_PASSWORD || "";
const DEFAULT_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
const DEFAULT_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

async function handleWooCommerceRequest(
  method: string,
  params: any
): Promise<any> {
  try {
    const siteUrl = params.siteUrl || DEFAULT_SITE_URL;
    const username = params.username || DEFAULT_USERNAME;
    const password = params.password || DEFAULT_PASSWORD;
    const consumerKey = params.consumerKey || DEFAULT_CONSUMER_KEY;
    const consumerSecret = params.consumerSecret || DEFAULT_CONSUMER_SECRET;

    if (!siteUrl) {
      throw new Error(
        "WordPress site URL not provided in environment variables or request parameters"
      );
    }

    // For standard WordPress API endpoints
    const wpMethods = [
      "create_post",
      "get_posts",
      "update_post",
      "get_post_meta",
      "update_post_meta",
      "create_post_meta",
      "delete_post_meta",
    ];

    // For WooCommerce API endpoints
    const wooMethods = [
      "get_products",
      "get_product",
      "create_product",
      "update_product",
      "delete_product",
      "get_orders",
      "get_order",
      "create_order",
      "update_order",
      "delete_order",
      "get_customers",
      "get_customer",
      "create_customer",
      "update_customer",
      "delete_customer",
      "get_sales_report",
      "get_products_report",
      "get_orders_report",
      "get_categories_report",
      "get_customers_report",
      "get_stock_report",
      "get_coupons_report",
      "get_taxes_report",
      "get_shipping_zones",
      "get_shipping_zone",
      "create_shipping_zone",
      "update_shipping_zone",
      "delete_shipping_zone",
      "get_shipping_methods",
      "get_shipping_zone_methods",
      "create_shipping_zone_method",
      "update_shipping_zone_method",
      "delete_shipping_zone_method",
      "get_shipping_zone_locations",
      "update_shipping_zone_locations",
      "get_tax_classes",
      "create_tax_class",
      "delete_tax_class",
      "get_tax_rates",
      "get_tax_rate",
      "create_tax_rate",
      "update_tax_rate",
      "delete_tax_rate",
      "get_coupons",
      "get_coupon",
      "create_coupon",
      "update_coupon",
      "delete_coupon",
      "get_order_notes",
      "get_order_note",
      "create_order_note",
      "delete_order_note",
      "get_order_refunds",
      "get_order_refund",
      "create_order_refund",
      "delete_order_refund",
      "get_product_variations",
      "get_product_variation",
      "create_product_variation",
      "update_product_variation",
      "delete_product_variation",
      "get_product_attributes",
      "get_product_attribute",
      "create_product_attribute",
      "update_product_attribute",
      "delete_product_attribute",
      "get_attribute_terms",
      "get_attribute_term",
      "create_attribute_term",
      "update_attribute_term",
      "delete_attribute_term",
      "get_product_categories",
      "get_product_category",
      "create_product_category",
      "update_product_category",
      "delete_product_category",
      "get_product_tags",
      "get_product_tag",
      "create_product_tag",
      "update_product_tag",
      "delete_product_tag",
      "get_product_reviews",
      "get_product_review",
      "create_product_review",
      "update_product_review",
      "delete_product_review",
      "get_payment_gateways",
      "get_payment_gateway",
      "update_payment_gateway",
      "get_settings",
      "get_setting_options",
      "update_setting_option",
      "get_system_status",
      "get_system_status_tools",
      "run_system_status_tool",
      "get_data",
      "get_continents",
      "get_countries",
      "get_currencies",
      "get_current_currency",
      "get_product_meta",
      "update_product_meta",
      "create_product_meta",
      "delete_product_meta",
      "get_order_meta",
      "update_order_meta",
      "create_order_meta",
      "delete_order_meta",
      "get_customer_meta",
      "update_customer_meta",
      "create_customer_meta",
      "delete_customer_meta",
    ];

    // Create WordPress REST API client
    let client;

    if (wpMethods.includes(method)) {
      if (!username || !password) {
        throw new Error(
          "WordPress credentials not provided in environment variables or request parameters"
        );
      }

      const auth = Buffer.from(`${username}:${password}`).toString("base64");
      client = axios.create({
        baseURL: `${siteUrl}/wp-json/wp/v2`,
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });
    } else if (wooMethods.includes(method)) {
      // For WooCommerce API requests
      if (!consumerKey || !consumerSecret) {
        throw new Error(
          "WooCommerce API credentials not provided in environment variables or request parameters"
        );
      }

      client = axios.create({
        baseURL: `${siteUrl}/wp-json/wc/v3`,
        params: {
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      throw new Error(`Unknown method: ${method}`);
    }

    // Handle WordPress API methods
    switch (method) {
      case "create_post":
        if (!params.title || !params.content) {
          throw new Error("Title and content are required for creating a post");
        }
        const createResponse = await client.post("/posts", {
          title: params.title,
          content: params.content,
          status: params.status || "draft",
        });
        return createResponse.data;

      case "get_posts":
        const getResponse = await client.get("/posts", {
          params: {
            per_page: params.perPage || 10,
            page: params.page || 1,
          },
        });
        return getResponse.data;

      case "update_post":
        if (!params.postId) {
          throw new Error("Post ID is required for updating a post");
        }
        const updateData: Record<string, any> = {};
        if (params.title) updateData.title = params.title;
        if (params.content) updateData.content = params.content;
        if (params.status) updateData.status = params.status;

        const updateResponse = await client.post(
          `/posts/${params.postId}`,
          updateData
        );
        return updateResponse.data;

      // Handle WooCommerce API methods
      // Products
      case "get_products":
        const productsResponse = await client.get("/products", {
          params: {
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return productsResponse.data;

      case "get_product":
        if (!params.productId) {
          throw new Error("Product ID is required");
        }
        const productResponse = await client.get(
          `/products/${params.productId}`
        );
        return productResponse.data;

      case "create_product":
        if (!params.productData) {
          throw new Error("Product data is required for creating a product");
        }
        const createProductResponse = await client.post(
          "/products",
          params.productData
        );
        return createProductResponse.data;

      case "update_product":
        if (!params.productId) {
          throw new Error("Product ID is required for updating a product");
        }
        if (!params.productData) {
          throw new Error("Product data is required for updating a product");
        }
        const updateProductResponse = await client.put(
          `/products/${params.productId}`,
          params.productData
        );
        return updateProductResponse.data;

      case "delete_product":
        if (!params.productId) {
          throw new Error("Product ID is required for deleting a product");
        }
        const deleteProductResponse = await client.delete(
          `/products/${params.productId}`,
          {
            params: {
              force: params.force || false,
            },
          }
        );
        return deleteProductResponse.data;

      // Orders
      case "get_orders":
        const ordersResponse = await client.get("/orders", {
          params: {
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return ordersResponse.data;

      case "get_order":
        if (!params.orderId) {
          throw new Error("Order ID is required");
        }
        const orderResponse = await client.get(`/orders/${params.orderId}`);
        return orderResponse.data;

      case "create_order":
        if (!params.orderData) {
          throw new Error("Order data is required for creating an order");
        }
        const createOrderResponse = await client.post(
          "/orders",
          params.orderData
        );
        return createOrderResponse.data;

      case "update_order":
        if (!params.orderId) {
          throw new Error("Order ID is required for updating an order");
        }
        if (!params.orderData) {
          throw new Error("Order data is required for updating an order");
        }
        const updateOrderResponse = await client.put(
          `/orders/${params.orderId}`,
          params.orderData
        );
        return updateOrderResponse.data;

      case "delete_order":
        if (!params.orderId) {
          throw new Error("Order ID is required for deleting an order");
        }
        const deleteOrderResponse = await client.delete(
          `/orders/${params.orderId}`,
          {
            params: {
              force: params.force || false,
            },
          }
        );
        return deleteOrderResponse.data;

      // Customers
      case "get_customers":
        const customersResponse = await client.get("/customers", {
          params: {
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return customersResponse.data;

      case "get_customer":
        if (!params.customerId) {
          throw new Error("Customer ID is required");
        }
        const customerResponse = await client.get(
          `/customers/${params.customerId}`
        );
        return customerResponse.data;

      case "create_customer":
        if (!params.customerData) {
          throw new Error("Customer data is required for creating a customer");
        }
        const createCustomerResponse = await client.post(
          "/customers",
          params.customerData
        );
        return createCustomerResponse.data;

      case "update_customer":
        if (!params.customerId) {
          throw new Error("Customer ID is required for updating a customer");
        }
        if (!params.customerData) {
          throw new Error("Customer data is required for updating a customer");
        }
        const updateCustomerResponse = await client.put(
          `/customers/${params.customerId}`,
          params.customerData
        );
        return updateCustomerResponse.data;

      case "delete_customer":
        if (!params.customerId) {
          throw new Error("Customer ID is required for deleting a customer");
        }
        const deleteCustomerResponse = await client.delete(
          `/customers/${params.customerId}`,
          {
            params: {
              force: params.force || false,
            },
          }
        );
        return deleteCustomerResponse.data;

      // Reports
      case "get_sales_report":
        const salesReportResponse = await client.get("/reports/sales", {
          params: {
            period: params.period || "month",
            date_min: params.dateMin || "",
            date_max: params.dateMax || "",
            ...params.filters,
          },
        });
        return salesReportResponse.data;

      case "get_products_report":
        const productsReportResponse = await client.get("/reports/products", {
          params: {
            period: params.period || "month",
            date_min: params.dateMin || "",
            date_max: params.dateMax || "",
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return productsReportResponse.data;

      case "get_orders_report":
        const ordersReportResponse = await client.get("/reports/orders", {
          params: {
            period: params.period || "month",
            date_min: params.dateMin || "",
            date_max: params.dateMax || "",
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return ordersReportResponse.data;

      // Product Categories
      case "get_product_categories":
        const categoriesResponse = await client.get("/products/categories", {
          params: {
            per_page: params.perPage || 10,
            page: params.page || 1,
            ...params.filters,
          },
        });
        return categoriesResponse.data;

      case "get_product_category":
        if (!params.categoryId) {
          throw new Error("Category ID is required");
        }
        const categoryResponse = await client.get(
          `/products/categories/${params.categoryId}`
        );
        return categoryResponse.data;

      // Product Meta operations
      case "get_product_meta":
        if (!params.productId) {
          throw new Error("Product ID is required");
        }
        const getProductResponse = await client.get(
          `/products/${params.productId}`
        );
        const productMetaData = getProductResponse.data.meta_data || [];
        if (params.metaKey) {
          return productMetaData.filter(
            (meta: WooMetaData) => meta.key === params.metaKey
          );
        }
        return productMetaData;

      case "create_product_meta":
      case "update_product_meta":
        if (!params.productId) {
          throw new Error("Product ID is required");
        }
        if (!params.metaKey) {
          throw new Error("Meta key is required");
        }
        if (params.metaValue === undefined) {
          throw new Error("Meta value is required");
        }
        const productMetaResponse = await client.get(
          `/products/${params.productId}`
        );
        let product = productMetaResponse.data;
        let metaData: WooMetaData[] = product.meta_data || [];
        const existingMetaIndex = metaData.findIndex(
          (meta: WooMetaData) => meta.key === params.metaKey
        );
        if (existingMetaIndex >= 0) {
          metaData[existingMetaIndex].value = params.metaValue;
        } else {
          metaData.push({
            key: params.metaKey,
            value: params.metaValue,
          });
        }
        const updateProductMetaResponse = await client.put(
          `/products/${params.productId}`,
          {
            meta_data: metaData,
          }
        );
        return updateProductMetaResponse.data.meta_data;

      // ...existing code...
      
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(
        `API error: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Handle GET requests for health check
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        name: "WooCommerce MCP Server",
        version: "1.0.0",
        status: "running",
        endpoints: {
          mcp: "/.netlify/functions/mcp-server (POST with MCP protocol)",
          direct: "/.netlify/functions/mcp-server (POST with JSON-RPC)"
        }
      }),
    };
  }

  // Only allow POST requests for MCP/JSON-RPC
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32601,
          message: "Method not allowed",
        },
      }),
    };
  }

  try {
    // Parse the JSON-RPC request
    const request: JsonRpcRequest = JSON.parse(event.body || "{}");
    
    if (request.jsonrpc !== "2.0") {
      throw new Error("Invalid JSON-RPC version");
    }

    // Handle MCP protocol methods
    if (request.method === "initialize") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {
                listChanged: true
              }
            },
            serverInfo: {
              name: "woocommerce-mcp-server",
              version: "1.0.0"
            }
          },
        }),
      };
    }

    if (request.method === "notifications/initialized") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          result: {}
        }),
      };
    }

    if (request.method === "tools/list") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          result: {
            tools: [
              {
                name: "get_products",
                description: "Get WooCommerce products",
                inputSchema: {
                  type: "object",
                  properties: {
                    perPage: { type: "number", description: "Products per page" },
                    page: { type: "number", description: "Page number" }
                  }
                }
              },
              {
                name: "get_orders",
                description: "Get WooCommerce orders",
                inputSchema: {
                  type: "object",
                  properties: {
                    perPage: { type: "number", description: "Orders per page" },
                    page: { type: "number", description: "Page number" }
                  }
                }
              },
              {
                name: "create_product",
                description: "Create a new WooCommerce product",
                inputSchema: {
                  type: "object",
                  properties: {
                    productData: { type: "object", description: "Product data" }
                  },
                  required: ["productData"]
                }
              }
            ]
          }
        }),
      };
    }

    if (request.method === "tools/call") {
      const toolName = request.params?.name;
      const toolArguments = request.params?.arguments || {};
      
      try {
        const result = await handleWooCommerceRequest(toolName, toolArguments);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: request.id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(result, null, 2)
                }
              ]
            }
          }),
        };
      } catch (error) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: request.id,
            error: {
              code: -32000,
              message: error instanceof Error ? error.message : String(error)
            }
          }),
        };
      }
    }

    // Handle direct WooCommerce requests (for backwards compatibility)
    const result = await handleWooCommerceRequest(
      request.method,
      request.params
    );

    // Return successful JSON-RPC response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: request.id,
        result,
      }),
    };

  } catch (error: unknown) {
    // Handle parsing errors
    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32700,
            message: "Parse error",
            data: error.message,
          },
        }),
      };
    }

    // Handle other errors
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32000,
          message: error instanceof Error ? error.message : String(error),
        },
      }),
    };
  }
};
