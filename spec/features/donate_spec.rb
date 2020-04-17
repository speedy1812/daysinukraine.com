describe "donate page", type: :feature do
  before do
    visit "/donate"
  end

  it "displays the correct title" do
    expect(page).to have_title("Donate")
  end

  it "display the correct heading" do
    expect(page).to have_css("h1", text: "Donate")
  end

end
