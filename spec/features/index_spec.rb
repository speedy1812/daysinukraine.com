# frozen_string_literal: true

describe "home page", type: :feature do
  before do
    visit "/"
  end

  it "displays the correct title" do
    expect(page).to have_title("Nathan & Katelin Day")
  end

  it "displays the home navbar" do
    expect(page).to have_css("nav.nav-background")
  end

  it "displays a blog post" do
    expect(page).to have_css("div.content-main")
  end
end
