import { db } from '../src/db';
import { users, oauthClients } from '../src/db/schema';
import { hashPassword } from '../src/services/crypto';

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const email = 'admin@example.com';
  const passwordHash = await hashPassword('password123');

  const [admin] = await db.insert(users).values({
    email,
    passwordHash,
  }).onConflictDoNothing().returning();

  if (admin) {
    console.log(`Created admin user: ${admin.email}`);
  } else {
    console.log(`Admin user already exists.`);
  }

  // Create test client
  const clientId = 'test-client-id';
  const clientSecret = 'test-client-secret';

  const [client] = await db.insert(oauthClients).values({
    name: 'Test Application',
    clientId,
    clientSecret,
    redirectUris: ['http://localhost:8080/callback', 'https://oauth2debugger.com/debug'],
  }).onConflictDoNothing().returning();

  if (client) {
    console.log(`Created test OAuth client: ${client.name} (ID: ${client.clientId})`);
  } else {
    console.log(`Test OAuth client already exists.`);
  }

  console.log('Seeding complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
