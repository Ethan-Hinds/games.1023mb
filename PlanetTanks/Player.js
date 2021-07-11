class Player {
    constructor(tank, name) {
        this.tank = tank;
        this.name = name;

        this.shotAngle = 0;
        this.shotPower = 0;

        this.menuDiv = $("<div> </div>");
        $("body").append(this.menuDiv);
        this.menuDiv.height("0");

        this.menu = {
			playerIndicator: $(
				`<p>${this.name}</p>`
			),
			angleLabel: $("<br><br><label>Angle: 0</label>"),
			angleSlider: $("<input type = 'range' min = '0' max = '360' value = '0'> </input>"),
			powerLabel: $("<br><br><label>Power: 0</label>"),
			powerSlider: $("<input type = 'range' min = '0' max = '100' value = '0'> </input>"),
			fireButton: $("<button onclick = 'fireButtonPressed()'> Fire </button>"),
		};

        for (let key in this.menu) {
			this.menuDiv.append(this.menu[key]);
			if (key != "weaponSelect") {
				this.menu[key].on("input", updateMenu);
			}
			this.menu[key].css("visibility", "hidden");
		}
    }

    showMenu() {
        for (let key in this.menu) {
            this.menu[key].css("visibility", "visible");
        }
    }

    hideMenu() {
        for (let key in this.menu) {
            this.menu[key].css("visibility", "hidden");
        }
    }
}