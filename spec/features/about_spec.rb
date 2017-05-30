describe "about page", type: :feature do
  before do
    visit "/about"
  end

  it "displays the correct title" do
    expect(page).to have_title("About Us")
  end

  it "display the correct heading" do
    expect(page).to have_css(:h1, text: "About Us")
  end

end
