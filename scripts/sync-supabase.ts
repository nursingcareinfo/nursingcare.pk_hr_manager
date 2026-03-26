import { supabaseAdmin, syncStaffToSupabase } from "../src/lib/supabase";
import { INITIAL_STAFF } from "../src/data/initialStaff";

/**
 * Script to manually sync initial staff data to Supabase
 * Run with: npm run sync:supabase
 */
async function main() {
  console.log("🚀 Starting Supabase sync...");

  if (!supabaseAdmin) {
    console.error("❌ Supabase Admin client not initialized. Ensure VITE_SUPABASE_SERVICE_ROLE_KEY is set.");
    process.exit(1);
  }

  try {
    console.log(`📦 Syncing ${INITIAL_STAFF.length} staff members...`);
    const data = await syncStaffToSupabase(INITIAL_STAFF);
    console.log("✅ Sync completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

main();
