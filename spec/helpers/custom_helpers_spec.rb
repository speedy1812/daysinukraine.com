# frozen_string_literal: true

RSpec.describe CustomHelpers do
  include CustomHelpers

  describe "#article_og_item_for" do
    context "when no custom page description is provided" do
      it "provides only the base description" do
        site_desc = "MAIN SITE DESCRIPTION"
        article_desc = nil
        expect(article_og_item_for(article_desc,
                                   site_desc)).to eq("MAIN SITE DESCRIPTION")
      end
    end

    context "when a custom description is provided" do
      it "displays the custom description" do
        site_desc = "MAIN SITE DESCRIPTION"
        article_desc = "Custom"
        expect(article_og_item_for(article_desc,
                                   site_desc)).to eq("Custom")
      end
    end
  end
end
