/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class travellerActor extends Actor {

	/**
	* Augment the basic actor data with additional dynamic data.
	*/
	prepareData() {
		super.prepareData();

		const actorData = this.data;
		const data = actorData.data;
		const flags = actorData.flags;

		// Make separate methods for each Actor type (character, npc, etc.) to keep
		// things organized.
		if (actorData.type === 'character') this._prepareCharacterData(actorData);
	}

	/**
	* Prepare Character type specific data
	*/
	_prepareCharacterData(actorData) {
		const data = actorData.data;

		// Make modifications to data here. For example:

		// Loop through attributes scores, and add their modifiers to our sheet output.
		for (let [key, attr] of Object.entries(data.attributes)) {
			attr.modifier = Math.floor((attr.value/3)-2);
			if (attr.value == 0){attr.modifier = -3;}
		}

		// Process Cascade skills
		// So... if a child skill is set to 0 or 1, then the cascade parent is set to 0.
		for (let [key, attr] of Object.entries(data.skills)) {

			if (attr.parent){
				var pnt = data.skills[attr.parent];
				if (attr.value >= 0) {
					pnt.value = 0;
					pnt.show = true;
				}
			}

			if (attr.cascade){
				if (attr.value > 0) {
					attr.value = 0;
				}
			}

			if (attr.label == "Jack Of All Trades") {
				if (attr.value > 0) {
					attr.show = true;
				} else {
					attr.show = false;
				}
			} else {
				if (attr.value >= 0) {
					attr.show = true;
				} else {
					attr.show = false;
				}
			}

			//console.log(data.addskillselect);
			if (data.addskillselect == key) {
				var skill = data.addskillselect;
				data.addskillselect = "";
				if (data.skills[skill].cascade){data.skills[skill].value = 0;}
				data.skills[skill].show = true;
			}

		}

	}

}
