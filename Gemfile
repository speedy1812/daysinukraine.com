# frozen_string_literal: true

source "https://rubygems.org"

gem "middleman", "~> 4.1"
gem "middleman-blog"
gem "middleman-minify-html", "~> 3.4"
gem "middleman-search_engine_sitemap", "~> 1.4"
gem "redcarpet", "~> 3.3", ">= 3.3.3"

# For feed.xml.builder
gem "builder", "~> 3.0"

# https://github.com/fredjean/middleman-s3_sync
gem "middleman-s3_sync", "~> 4.0"

# Had to add mime-types to get s3_sync to work
# https://github.com/fredjean/middleman-s3_sync/issues/123
gem "mime-types", "~> 3.0"

# Temporary fix for https://github.com/middleman/middleman/issues/2569
gem 'haml', '~> 5.0'

# Thor 1.2.1 is throwing an error as of Oct 2022
gem 'thor', '1.1.0'

group :development do
  gem "capybara", "~> 3.3"
  gem "launchy", "~> 2.4"
  gem "rspec", "~> 3.6"
end
