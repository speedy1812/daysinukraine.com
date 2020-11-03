# frozen_string_literal: true

module CustomHelpers
  def article_og_item_for(article_item, site_item)
    !article_item.nil? ? article_item : site_item
  end
end
