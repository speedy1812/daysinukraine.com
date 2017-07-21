# This file is for reference only. Actual settings for the production
# environment are stored in the build configuation block in config.rb.
#
# https://middlemanapp.com/basics/upgrade-v4/#environments-and-changes-to-configure-blocks

activate :asset_hash
activate :asset_host, host: "https://d1ll4tgr741o0l.cloudfront.net"

# https://github.com/fredjean/middleman-s3_sync#http-caching
default_caching_policy max_age: (60 * 60 * 24 * 365)
caching_policy "text/html", public: true, max_age: 0, must_revalidate: true
caching_policy "application/xml", no_cache: true
