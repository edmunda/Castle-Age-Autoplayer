/////////////////////////////////////////////////////////////////////
//                          GUILD
/////////////////////////////////////////////////////////////////////

/* This section is formatted to allow Advanced Optimisation by the Closure Compiler */
/*jslint sub: true */
caap.checkResults_guild = function() {
	try {
		if(session.getItem("clickUrl").hasIndexOf("guild_battle=true")) {
			caap.guildTabAddListener();
			con.log(2, "Battle List");
			return true;
		}

		// Guild
		var guildTxt = '', guildDiv = $j(), tStr = '', members = [], save = false;

		if(config.getItem('enableMonsterFinder', false)) {
			feed.items("guild");
		}
		guildTxt = $j("#" + caap.domain.id[caap.domain.which] + "guild_achievement", caap.appBodyDiv).text().trim().innerTrim();
		if($u.hasContent(guildTxt)) {
			tStr = guildTxt.regex(/Monster ([\d,]+)/);
			caap.stats['guild']['mPoints'] = $u.hasContent(tStr) ? ($u.isString(tStr) ? tStr.numberOnly() : tStr) : 0;
			tStr = guildTxt.regex(/Battle ([\d,]+)/);
			caap.stats['guild']['bPoints'] = $u.hasContent(tStr) ? ($u.isString(tStr) ? tStr.numberOnly() : tStr) : 0;
			tStr = guildTxt.regex(/Monster [\d,]+ points \(Top (\d+\-\d+%)\)/);
			caap.stats['guild']['mRank'] = $u.hasContent(tStr) ? tStr : '';
			tStr = guildTxt.regex(/Battle [\d,]+ points \(Top (\d+\-\d+%)\)/);
			caap.stats['guild']['bRank'] = $u.hasContent(tStr) ? tStr : '';
			save = true;
		} else {
			con.warn('Using stored guild Monster and Battle points.');
		}
		guildTxt = $j("#" + caap.domain.id[caap.domain.which] + "guild_blast input[name='guild_id']", caap.globalContainer).attr("value");
		if($u.hasContent(guildTxt)) {
			caap.stats['guild']['id'] = guildTxt;
			save = true;
		} else {
			con.warn('Using stored guild_id.');
		}
		guildTxt = $j("#" + caap.domain.id[caap.domain.which] + "guild_banner_section", caap.globalContainer).text().trim();
		if($u.hasContent(guildTxt)) {
			caap.stats['guild']['name'] = guildTxt;
			save = true;
		} else {
			con.warn('Using stored guild name.');
		}
		guildDiv = $j("#" + caap.domain.id[caap.domain.which] + "cta_log div[style*='guild_main_score_middle'] a[href*='keep.php?casuser']", caap.globalContainer);
		if($u.hasContent(guildDiv)) {
			guildDiv.each(function() {
				var t = $j(this), uid = t.attr("href").regex(/casuser=(\d+)/), name = t.text().trim();

				if(uid !== caap.stats['FBID']) {
					members.push({
						'userId' : uid,
						'name' : name
					});
				}
			});
			caap.stats['guild']['members'] = members.slice();
			save = true;
		} else {
			con.warn('Using stored guild member count.');
		}

		con.log(2, "checkResults_guild", caap.stats['guild']);
		if(save) {
			caap.saveStats();
		}

		return true;
	} catch (err) {
		con.error("ERROR in checkResults_guild: " + err);
		return false;
	}
};
caap.guildTabListener = function(event) {
	session.setItem("clickUrl", $u.setContent($j(event.target).parent().attr("onclick"), '').regex(new RegExp(",'(.+\\.php.*?)'")));
};
caap.guildTabAddListener = function() {
	$j("div[style*='guild_tab_off_tile.jpg'],div[style*='guild_tab_on_tile.jpg']").unbind('click', caap.guildTabListener).bind('click', caap.guildTabListener);
};
caap.checkResults_guild_panel = function() {
	caap.guildTabAddListener();
};
caap.checkResults_guild_shop = function() {
	caap.guildTabAddListener();
};
caap.checkResults_guild_class = function() {
	caap.guildTabAddListener();
};
caap.checkResults_guild_formation = function() {
	caap.guildTabAddListener();
};
