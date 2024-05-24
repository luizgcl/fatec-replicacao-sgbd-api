import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      replicas: {
        write: {
          connection: {
            host: env.get('DB_HOST'),
            port: env.get('DB_PORT'),
          },
        },
        read: {
          connection: [
            {
              host: env.get('DB_HOST'),
              port: env.get('DB_SLAVE_1_PORT'),
            },
            {
              host: env.get('DB_HOST'),
              port: env.get('DB_SLAVE_2_PORT'),
            },
          ],
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
