source "https://rubygems.org"

gem "middleman", "~> 4.1"
gem "middleman-blog"
gem "middleman-minify-html", "~> 3.4"
gem "redcarpet", "~> 3.3", ">= 3.3.3"

# For feed.xml.builder
gem "builder", "~> 3.0"

# https://github.com/fredjean/middleman-s3_sync
gem "middleman-s3_sync", "~> 4.0"
# Had to add mime-types to get s3_sync to work
# https://github.com/fredjean/middleman-s3_sync/issues/123
gem "mime-types", "~> 3.0"

group :development do
  gem "capybara", "~> 3.3"
  gem "launchy", "~> 2.4"
  gem "rspec", "~> 3.6"
end
