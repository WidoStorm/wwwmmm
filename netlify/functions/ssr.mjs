import { createServerEntry } from '../../dist/server/server.js'

const entry = createServerEntry()

export default async (request, context) => entry.fetch(request, {}, context)
