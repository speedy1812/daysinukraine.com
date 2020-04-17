describe "plexus page", type: :feature do
  before do
    visit "/plexus"
  end

  it "displays the correct title" do
    expect(page).to have_title("Plexus")
  end

  it "display the correct heading" do
    expect(page).to have_css("h1", text: "Plexus")
  end

end
