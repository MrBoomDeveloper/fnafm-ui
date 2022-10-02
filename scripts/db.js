const click = new Audio("./sounds/click.mp3")
click.volume = .025

main.popTab = function(page, back_btn) {
	boom.log("Popup " + page)
	element(`#${page}-page`).style.display = "grid"
	switch(page) {
	case "profile":
		back_btn.innerHTML = "My Profile"
		break
	case "settings":
		back_btn.innerHTML = "Settings"
		break
	case "modes":
		back_btn.innerHTML = "Select Game Mode"
		break
	}
}

gm.array = [{
	name: "Fazbear's Pizzeria", banner: "banner_gamemode_party.jpg", time: 6, players: 6,
	description: "The machines gained consciousness and began their fight! Fight against animatronic machines and take first place."
}, {
	name: "Night Party", banner: "banner_gamemode_party.png", time: 12, players: 8,
	description: "Welcome to Fazbear's private party! On it you will meet new friends, and our entertainment program will not let you get bored!"
}, {
	name: "The Hunt", banner: "banner_gamemode_hunt.jpg", time: 15, players: 4,
	description: "Now your main goal is to survive. No matter how formidable you are, they will always find you."
}, {
	name: "Arcade Mayhem", banner: "banner_gamemode_arcade.jpg", time: 6, players: 5,
	description: "Oh no! It looks like the system has crashed and now the silent slash has turned into a crazy hell!"
}]

pass.array = [0]

gm.resize = function(id, banner) {
	switch(id) {
	case 0:
		banner.style.backgroundSize = "calc(100% - 20rem)"
		banner.style.backgroundPosition = "right 15%"
		boom.log("Make poster smaller")
		break
	case 3:
		banner.style.backgroundSize = "calc(100% - 15rem)"
		banner.style.backgroundPosition = "right 25%"
		boom.log("Make poster smaller and center")
		break
	default:
		banner.style.backgroundSize = "cover"
		banner.style.backgroundPosition = "10rem center"
		boom.log("Default poster properties")
		break
	}
}

const items = [
	[
		{name: "VIP Nightmare Pass", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 99},
		{name: "Night Hide and Seek", banner: "banner_shop_freddy.jpg", cost_type: "diamond", cost_amount: 60},
		{name: "Pirate Duo", banner: "banner_addon_default.png", cost_type: "diamond", cost_amount: 120}
	], [
		{name: "Freddy suit", banner: "banner_shop_pass.png", cost_type: "coin", cost_amount: 1200},
		{name: "Bonnie suit", banner: "banner_shop_pass.png", cost_type: "coin", cost_amount: 1200},
		{name: "Chica suit", banner: "banner_shop_pass.png", cost_type: "coin", cost_amount: 800},
		{name: "Foxy suit", banner: "banner_shop_pass.png", cost_type: "coin", cost_amount: 800},
		{name: "MrBoomDev suit", banner: "banner_shop_pass.png", cost_type: "coin", cost_amount: 2000},
	], [
		{name: "Placeholder", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder 2", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder 3", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder 4", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999}
	], [
		{name: "Placeholder1", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder2", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder3", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
		{name: "Placeholder4", banner: "banner_shop_pass.png", cost_type: "diamond", cost_amount: 999},
	]
]

char.tabs = [["emoji_people", "Suit"], ["psychology", "Chip"]]

char.inventory = {equiped: [], unequiped: []}

shop.content = [[], [], [], []]

shop.tabs = ["Special Offer", "Suits", "Boosts", "Currencies"]

profile.stats = [
	{name: "Nights Survived", value: 0},
	{name: "You died times", value: 0},
	{name: "You killed times", value: 0},
	{name: "Games started", value: 0},
	{name: "Games won", value: 0},
	{name: "Games loose", value: 0},
	{name: "Hours of play", value: 0},
	{name: "Skills used", value: 0}
]

nav.tabs = [
	{ icon: "home", name: "Home", id: 0 },
	{ icon: "person", name: "Character", id: 1 }, 
	{ icon: "local_activity", name: "Season", id: 2 },
	{ icon: "store", name: "Store", id: 3 },
	{ icon: "check_circle", name: "Quests", id: 4, class: "last" },
	{ icon: "update", name: "Updates", id: 5, class: "bottom" },
	{ icon: "info", name: "About", id: 6 }
]

nav.display = function(tabso, id) {
	switch(id) {
		case 0: case 1: case 2: case 6:
			boom.log("Set tab display grid")
			tabso[id].style.display = "grid"
			break
		default:
			boom.log("Set tab display flex")
			tabso[id].style.display = "flex"
			break
	}
	
	switch(id) {
		case 1:
			tip(["char_tip", "placeholder_freddy.png", "Create your own character!",
			"During the match, you will control your animatronic car. Gather parts to improve your creation!"])
			break
		case 2:
			tip(["pass-tip", "ui_pass_trump_freddy_icon.png", "Intoducing Season Pass!",
			"Get various rewards as you level up. New rewards every month!"])
			break
		case 4:
			tip(["task_tip", "ui_mission_chica.png", "Complete Quests",
			"Increase your level by completing tasks. I don't know what to write next. Then I will come up with a continuation of this text. No one will read it anyway. So right? Are you still reading all this nonsense? But why? Somehow I ask a lot of questions. It's like we're on some kind of interrogation. Let's talk about life better. How are you doing? Okay I have to go. It was nice to chat. See you!"])
			break
	}
}

function tip(arg) {
	if(cookies.get(arg[0])) return
		new BoomDialog(arg[0]).tip({title: arg[2],
		content: arg[3], icon: arg[1]})
	cookies.set(arg[0], 1)
}


const updates = [
	//"<h1>Update H.E.N.T.A.I - OMG!?</h1><p>Grow up from a random nerd into a HOG RIDER! Is this meme still funny?</p><p>Put these BTS into your basement, so they can give you money!</p><p>Collect your own harem with: Milfs, Elfs, CatGirls and even... lollies 😯</p><p>Collect a new currency ¥ on the map to get new girls into your house</p><p>Didnt i mentioned that now you can buy or build your own pizzeria - house!</p><p>Play as a brand new character - SexyBoom</p><p>All these new features are coming in this epic update!</p>",
	//"<h1>Update 1.1.4 - no_name</h1><p>Fixed several bugs</p>",
	//"<h1>Update 1.1.3 - no_name</h1><p>Sponsored Ads (i'll promote only our social media and other interesting links) ex: Join our Discord Server, Subscribe to our YouTube channel and etc. AND THERE WILL BE NO TARGETING AD</p>",
	//'<h1>Update 1.1.2 - Mission "Get this Cupcake"</h1><p>Missions is here! Complete them to get rewards and level up!</p><p>Level up to get rewards in the new Season Pass!</p><p>Businnes Freddy skin</p><p>Win and loose animation</p><p>Get rewards for winning</p><p>Music and sound effects</p><p>Foxy the Fox skin</p><p>Golden Freddy skin</p><p>Minor changes</p>',
	//"<h1>Update 1.1.1 - The Beautiful Update</h1><p>Now you can customize your character</p><p>Buy useful stuff in the Store</p><p>Use new skills by upgrading your profile level</p><p>A playable MrBoom skin!</p><p>Freddy Fazbear skin</p><p>Bonnie the Bunnie skin</p><p>Chica the Chicken skin</p><p>GameJolt sign-in method</p><p>Fixed bugs</p>",
	//"<h1>Update 1.1.0 - Play Together!</h1><p>Play with your friends in the local network!</p><p>Daily Rewards are here! Come to game every day for a week to get a special reward!</p><p>A bunch of new profile icons</p><p>Now you can change your nickname into what you want</p><p>Put your Social Media links into profile, so that anybody can see it! Currently supported is: Discord, GameJolt & YouTube</p><p>Added bots into matchmaking to make it much faster</p><p>Minor gameplay changes</p><p>Fixed several bugs</p>",
	//"<h1>Update 1.0.9 - Lets Party!</h1><p>From now on, the client will ask to update the Android System WebView if its version is lower than required (this is necessary for stable rendering of the interface and other web magic)</p><p>Updated loading screen to match the new design system</p><p>A game logo just got improved</p><p>Matchmaking finally is working, press start to begin the game!</p><p>Gameplay</p><p>Now you can walk forward, back, left, right</p><p>Jump & Attack are now available</p>",
	"<h2>Update 1.0.8 - We're back!</h2><ul><li>BoomDesign is now used in the project</li><li>Added button click animations, page transitions, etc.</li><li>A lot of work has been done to optimize resources and as a result, I managed to reduce them several times!</li><li>Now the native client will only render: dialog boxes, loading screens and the game session. Other work is related to the web application.</li><li>Some parts of the interface returned from 1.0 .7</li><li>The entire interface has been redesigned using HTML, CSS and JS.</li><li>Updated icons</li><li>Tips, Notifications in the bottom corner.</li></ul>"
]

const about = [[
	{name: "start", title: "Used resources"},
	{name: "BoomDesign", description: "My own design system with its own guidelines", link: "https://bit.ly/mrboomdevdesign"},
	{name: "Google Fonts", description: " Catalog of open-source fonts and icons", link: "https://fonts.google.com"},
	{name: "FNaF AR Assets", description: "Some posters and icons", link: "https://illumix.com"},
	{name: "RockstarSelenite", description: "Arcade Mayhem gamemode poster", link: "https://deviantart.com/rockstarselenite"},
	{name: "Shimiiy", description: "Loading screen render", link: "https://deviantart.com/shimiiy"},
	{name: "end"}
], [
	{name: "start", title: "Our Team"},
	{name: "MrBoomDev", description: "Chief Developer, Designer", link: "https://bit.ly/mrboomdevyt"},
	{name: "Dapperat", description: "Manager, Ideas, Promotion", link: "https://youtube.com/channel/UC6orzQuOT3jZFiXMtXBIk6g"},
	{name: "Darkil", description: "Design, Ideas", link: "https://youtube.com/channel/UCxXJLSwf1eJl810PdGXj7MA"},
	{name: "Nyan BunBun", description: "Design, Ideas", link: "https://youtube.com/channel/UCV-am5JX65zCBZZCsX4Fm2w"},
	{name: "Lasaniaden", description: "Ideas, Textures", link: "https://youtube.com/channel/UCKnED4jxcj0x3VatBRj4jcQ"},
	{name: "Portal#9250", description: "Renders", link: "#"},
	{name: "end"}
]]

const settings = [{
	title: "General",
	content: [{
		title: "Visible controls", key: "controls",
		description: "If you are not playing on a touch device, you can disable this option."
	}, {
		title: "Visible stats", key: "ui",
		description: "If you are not playing on a touch device, you can disable this option."
	}, {
		title: "Show fps", key: "fps",
		description: "Frames per second will be shown at the upper left corner."
	}
	]}, {
	title: "Sound & Music",
	content: [{
		title: "Enable music", key: "music",
		description: "Toggles lobby theme, match theme."
	}, {
		title: "Enable sounds", key: "sounds",
		description: "Toggles click sounds, footsteps, jumps and etc."
	}
	]}, {
	title: "Debug",
	content: [{
		title: "Show coordinates", key: "coordinates",
		description: "The player character's coordinates will be shown in the upper left corner."
	}, {
		title: "Shop debug logs", key: "logs",
		description: "The logs help in debugging the application."
	}, {
		title: "Require internet", key: "internet",
		description: "It is not recommended to turn off normal users!"
	}
]}]
	
default_settings = [
	["controls", true], 
	["ui", true], 
	["sounds", true], 
	["music", true], 
	["internet", true], 
	["firstLaunch", true]
]