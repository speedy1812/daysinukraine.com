describe "home page", type: :feature do
  before do
    visit "/"
  end

  it "displays the correct title" do
    expect(page).to have_title("Nathan & Katelin Day")
  end

  it "displays the home navbar" do
    expect(page).to have_css("nav.navbar")
  end

  it "displays a blog post" do
    expect(page).to have_css("h2.article__post-title")
  end

end
