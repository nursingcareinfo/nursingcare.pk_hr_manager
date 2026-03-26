import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { INITIAL_STAFF } from "./src/data/initialStaff.js";
import { INITIAL_PATIENTS } from "./src/data/initialPatients.js";

/**
 * MCP Server for Nursing Care HR Management System
 * This allows AI agents (like Goose, Kilo, or Claude Desktop) to query the HR data.
 */
const server = new Server(
  {
    name: "nursing-care-hr-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Define available tools for the MCP server
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_staff_list",
        description: "Get a list of all staff members in the Nursing Care HR system.",
        inputSchema: {
          type: "object",
          properties: {
            designation: { type: "string", description: "Filter by designation (e.g., Staff Nurse)" },
          },
        },
      },
      {
        name: "get_patient_list",
        description: "Get a list of all patients in the Nursing Care HR system.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_employee_details",
        description: "Get detailed information about a specific employee by ID.",
        inputSchema: {
          type: "object",
          properties: {
            employeeId: { type: "string", description: "The unique ID of the employee (e.g., NC-KHI-001)" },
          },
          required: ["employeeId"],
        },
      },
    ],
  };
});

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_staff_list": {
      let staff = INITIAL_STAFF;
      if (args?.designation) {
        staff = staff.filter((s: any) => s.designation === args.designation);
      }
      return {
        content: [{ type: "text", text: JSON.stringify(staff, null, 2) }],
      };
    }

    case "get_patient_list": {
      return {
        content: [{ type: "text", text: JSON.stringify(INITIAL_PATIENTS, null, 2) }],
      };
    }

    case "get_employee_details": {
      const employee = INITIAL_STAFF.find((s: any) => s.id === args?.employeeId);
      if (!employee) {
        return {
          content: [{ type: "text", text: `Employee with ID ${args?.employeeId} not found.` }],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(employee, null, 2) }],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

/**
 * Start the MCP server using Stdio transport
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Nursing Care HR MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP server:", error);
  process.exit(1);
});
