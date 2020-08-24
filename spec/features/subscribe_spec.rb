describe "subscribe page", type: :feature do
  before do
    visit "/subscribe"
  end

  it "displays the correct title" do
    expect(page).to have_title("Subscribe")
  end

  it "display the correct heading" do
    expect(page).to have_css("h1", text: "Subscribe")
  end

  it "display a signup box" do
    # expect(page).to have_css(:form)
    expect(page).to have_css("input.shadow-inner")
  end

end
