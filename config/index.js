'use strict'

const config = {
  SKOLESKYSS_SERVER_PORT_WEB: process.env.SKOLESKYSS_SERVER_PORT_WEB || 8000,
  SKOLESKYSS_DB_CONNECTION_QUEUE: process.env.SKOLESKYSS_DB_CONNECTION_QUEUE || 'mongodb://localhost/skoleskyss',
  SKOLESKYSS_CALLBACK_STATUS_URL: process.env.SKOLESKYSS_CALLBACK_STATUS_URL || 'https://api.buddy.com/status/',
  SKOLESKYSS_AUTH_URL: process.env.SKOLESKYSS_AUTH_URL || '/login',
  SKOLESKYSS_JWT_SECRET: process.env.SKOLESKYSS_JWT_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  SKOLESKYSS_ENCRYPTOR_KEY: process.env.SKOLESKYSS_ENCRYPTOR_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  SKOLESKYSS_COOKIE_SECRET: process.env.SKOLESKYSS_COOKIE_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  SKOLESKYSS_YAR_SECRET: process.env.SKOLESKYSS_YAR_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  SKOLESKYSS_GITHUB_FEEDBACK_URL: process.env.SKOLESKYSS_GITHUB_FEEDBACK_URL || 'https://api.github.com/repos/:user/:repo/issues',
  SKOLESKYSS_GITHUB_USER: process.env.SKOLESKYSS_GITHUB_USER || 'yourgithubuser',
  SKOLESKYSS_GITHUB_TOKEN: process.env.SKOLESKYSS_GITHUB_TOKEN || 'yourgithubtoken'
}

module.exports = config
