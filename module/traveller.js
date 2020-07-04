// Import Modules
import { travellerActor } from "./actor/actor.js";
import { travellerActorSheet } from "./actor/actor-sheet.js";
import { travellerItem } from "./item/item.js";
import { travellerItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.traveller = {
    travellerActor,
    travellerItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "2d6",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = travellerActor;
  CONFIG.Item.entityClass = travellerItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("traveller", travellerActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("traveller", travellerItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper({
      eq: (v1, v2) => v1 === v2,
      ne: (v1, v2) => v1 !== v2,
      lt: (v1, v2) => v1 < v2,
      gt: (v1, v2) => v1 > v2,
      lte: (v1, v2) => v1 <= v2,
      gte: (v1, v2) => v1 >= v2,
      and() {
          return Array.prototype.every.call(arguments, Boolean);
      },
      or() {
          return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      }
  });

});
