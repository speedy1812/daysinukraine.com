# frozen_string_literal: true

describe "contact page", type: :feature do
  before do
    visit "/contact"
  end

  it "displays the correct title" do
    expect(page).to have_title("Contact Us")
  end

  it "display the correct heading" do
    expect(page).to have_css("h1", text: "Contact Us")
  end
end
