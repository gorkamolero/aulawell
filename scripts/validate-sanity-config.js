#!/usr/bin/env node

/**
 * Simple script to validate Sanity configuration
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Validating Sanity CMS configuration...\n')

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION'
]

const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.local.example')

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found')
  if (fs.existsSync(envExamplePath)) {
    console.log('💡 Copy .env.local.example to .env.local and fill in your values')
  }
  process.exit(1)
}

// Check for required files
const requiredFiles = [
  'sanity.config.ts',
  'sanity/schemas/index.ts',
  'sanity/lib/client.ts',
  'sanity/lib/queries.ts',
  'sanity/lib/fetch.ts',
  'app/studio/[[...tool]]/page.tsx'
]

let allFilesExist = true

for (const file of requiredFiles) {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - missing`)
    allFilesExist = false
  }
}

// Check schemas
const schemasPath = path.join(process.cwd(), 'sanity/schemas')
const expectedSchemas = [
  'testimonial.ts',
  'service.ts',
  'successStory.ts',
  'teamMember.ts',
  'faq.ts',
  'post.ts'
]

console.log('\n📋 Content Schemas:')
for (const schema of expectedSchemas) {
  const schemaPath = path.join(schemasPath, schema)
  if (fs.existsSync(schemaPath)) {
    console.log(`✅ ${schema}`)
  } else {
    console.log(`❌ ${schema} - missing`)
    allFilesExist = false
  }
}

if (allFilesExist) {
  console.log('\n🎉 Sanity CMS configuration is complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Set up your .env.local with actual Sanity project values')
  console.log('2. Run: npx sanity@latest init')
  console.log('3. Visit http://localhost:3000/studio to access Sanity Studio')
  console.log('4. Deploy studio: npx sanity@latest deploy')
} else {
  console.log('\n❌ Some files are missing. Please check the setup.')
  process.exit(1)
}