/////////////////////////////////////////////////////////////////////
//                          POTIONS
/////////////////////////////////////////////////////////////////////

/* This section is formatted to allow Advanced Optimisation by the Closure Compiler */
/*jslint sub: true */
caap.autoPotions = function() {
	try {
		if(!config.getItem('AutoPotions', true) || !schedule.check('AutoPotionTimerDelay')) {
			return false;
		}

		if(caap.stats['exp']['dif'] <= config.getItem("potionsExperience", 20)) {
			con.log(2, "AutoPotions, ENL condition. Delaying 10 minutes");
			schedule.setItem('AutoPotionTimerDelay', 600);
			return false;
		}

		function consumePotion(potion) {
			try {
				if(!$j("div[style*='keep_cont_top']")) {
					con.log(2, "Going to keep for potions");
					if(caap.navigateTo('keep')) {
						return true;
					}
				}

				var formId = caap.domain.id[caap.domain.which] + "consume_1", potionDiv = $j(), button = null;

				if(potion === 'stamina') {
					formId = caap.domain.id[caap.domain.which] + "consume_2";
				}

				con.log(1, "Consuming potion", potion);
				potionDiv = $j("form[id='" + formId + "'] input[src*='keep_consumebtn.jpg']");
				if(potionDiv && potionDiv.length) {
					button = potionDiv;
					if(button) {
						caap.click(button);
					} else {
						con.warn("Could not find consume button for", potion);
						return false;
					}
				} else {
					con.warn("Could not find consume form for", potion);
					return false;
				}

				return true;
			} catch (err) {
				con.error("ERROR in consumePotion: " + err, potion);
				return false;
			}
		}

		if(caap.stats['energy']['num'] < caap.stats['energy']['max'] - 10 && caap.stats['potions']['energy'] >= config.getItem("energyPotionsSpendOver", 39) && caap.stats['potions']['energy'] > config.getItem("energyPotionsKeepUnder", 35)) {
			return consumePotion('energy');
		}

		if(caap.stats['stamina']['num'] < caap.stats['stamina']['max'] - 10 && caap.stats['potions']['stamina'] >= config.getItem("staminaPotionsSpendOver", 39) && caap.stats['potions']['stamina'] > config.getItem("staminaPotionsKeepUnder", 35)) {
			return consumePotion('stamina');
		}

		return false;
	} catch (err) {
		con.error("ERROR in autoPotions: " + err);
		return false;
	}
};
/*jslint sub: false */
