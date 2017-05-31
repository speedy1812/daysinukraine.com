describe "sermons page", type: :feature do
  before do
    visit "/sermons"
  end

  it "displays the correct title" do
    expect(page).to have_title("Sermons")
  end

  it "display the correct heading" do
    expect(page).to have_css(:h1, text: "Sermons")
  end

end
