import {state,load,hero,regen,save} from './core/state.js';
import {generateEncounters} from './systems/encounters.js';
import {tickCombat,tickPassive} from './systems/combat.js';
import {render,handle,toast} from './screens/views.js';
load();if(hero())generateEncounters();render();
document.addEventListener('click',e=>{let target=e.target.closest('[data-action]');if(target)handle(target.dataset.action)});
setInterval(()=>{regen();if(state.screen==='combat'&&state.combat){let events=tickCombat();if(events){render();if(!state.combat){state.screen='map';render();toast(events.join(' · '))}}}},1000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});

setInterval(()=>{if(state.screen==='combat'&&state.combat){let events=tickPassive();if(events){if(!state.combat)state.screen='map';render();if(!state.combat)toast(events.join(' · '))}}},500);
