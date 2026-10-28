import {state,load,hero,regen,save} from './core/state.js';
import {generateEncounters} from './systems/encounters.js';
import {tickCombat,tickPassive} from './systems/combat.js';
import {render,handle,toast} from './screens/views.js';
load();if(hero())generateEncounters();render();
document.addEventListener('click',e=>{let target=e.target.closest('[data-action]');if(target)handle(target.dataset.action)});
setInterval(()=>{regen();if(state.screen==='combat'&&state.combat){let events=tickCombat();if(events){render();if(!state.combat){state.screen='map';render();toast(events.join(' · '))}}}},1000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});

setInterval(()=>{if(state.screen==='combat'&&state.combat){let events=tickPassive();if(events){if(!state.combat)state.screen='map';render();if(!state.combat)toast(events.join(' · '))}}},500);

// UI feedback is rendered outside the combat log, above the affected combatant.
let floatId=0;
function flushFeedback(){const b=state.combat;if(b?.floating?.length){for(const f of b.floating.splice(0)){const layer=document.querySelector('#float-'+f.target);if(!layer)continue;const el=document.createElement('span');el.className='floating-number '+f.kind;el.textContent=f.text;el.style.left=(20+(floatId++%5)*13)+'%';layer.appendChild(el);setTimeout(()=>el.remove(),1300)}}const ups=state.levelUps||[];if(ups.length&&!document.querySelector('#level-overlay')){const lv=ups.shift(),overlay=document.createElement('div');overlay.id='level-overlay';overlay.className='overlay';overlay.innerHTML='<div class="modal level-popup"><h1>✨ LEVEL UP! ✨</h1><h2>Level '+lv+'</h2><p>+5 Max HP · +5 AC</p><p>+5 stat points · +1 talent point</p><button class="btn primary" id="level-continue">Continue</button></div>';document.body.appendChild(overlay);overlay.querySelector('#level-continue').addEventListener('click',()=>overlay.remove())}}
setInterval(flushFeedback,100);
