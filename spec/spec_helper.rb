# frozen_string_literal: true

require "rspec"
require "capybara/rspec"
require "middleman-core"
require "middleman-blog"
require "middleman-core/rack"
require "middleman-s3_sync"

middleman_app = ::Middleman::Application.new do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), ".."))
  set :environment, :test
  set :show_exceptions, true
end

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app
