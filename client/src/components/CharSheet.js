import React from "react";
import getModifier from "./StatGenerator";
import { generateScore, d6HP, d8HP, h10HP, d12HP, getHPTotal } from "../utils/abilityScore"
import { QUERY_SINGLE_CHARACTER } from "../utils/queries";

const CharSheet = (character) => {
  return (
    <div className="container">
      <div className="charInfo">
        <div className="col-4">
          <h3 className="charName">{character.characterName}</h3>
          <h3 className="userName">{character.madeBy}</h3>
        </div>
        <div className="col-4">
          <h3 className="charRace">{character.race}</h3>
          <h3 className="charClass">{character.className}</h3>
        </div>
        <div className="col-4">
          <h3 className="charHP">{character.hitPoints}</h3>
          {/* <h3 className="charAlignment">{character.alignment}</h3> */}
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <table className="table">
            <tr>
              <th>Ability</th>
              <th>Score</th>
              <th>Modifier</th>
            </tr>
            <tr>
              <td>Strength</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="strScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="strMod"></input>
              </td>
            </tr>
            <tr>
              <td>Dexterity</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="dexScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="dexMod"></input>
              </td>
            </tr>
            <tr>
              <td>Constitution</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="conScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="conMod"></input>
              </td>
            </tr>
            <tr>
              <td>Intelligence</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="intScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="intMod"></input>
              </td>
            </tr>
            <tr>
              <td>Wisdom</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="wisScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="wisMod"></input>
              </td>
            </tr>
            <tr>
              <td>Charisma</td>
              <td>
                <input
                  type="number"
                  value="10"
                  id="chaScore"
                  onChange="getModifier()"
                ></input>
              </td>
              <td>
                <input type="number" placeholder="0" id="chaMod"></input>
              </td>
            </tr>
          </table>
        </div>
        <div className="col-4">
          <h2>Player Level</h2>

          <input type="number" id="charLevel" min="1" max="20"></input>
        </div>
        <div className="col-4">
          <h2>Proficiency Bonus</h2>

          <input type="number" id="profBonus"></input>

          <div className="charHPNumbers col-4">
            <h3>Total Hit Points</h3>
            <h3 className="charHP">{character.hitPoints}</h3>

            {/* <input type="number" id="totalHP"></input> */}

            <h3>Current Hit Points</h3>

            <input type="number" id="currentHP"></input>

            <h3>Temporary Hit Points</h3>

            <input type="number" id="temporaryHP" placeholder="0"></input>
          </div>
          <div className="container" id="savingThrows">
            <div className="col-4">
              <table className="table">
                <tr>
                  <th>Saving Throw</th>
                  <th>Modifier</th>
                </tr>
                <tr>
                  <td>Strength</td>
                  <td>
                    <input type="number" placeholder="0" id="strSave"></input>
                  </td>
                  <td>Dexterity</td>
                  <td>
                    <input type="number" placeholder="0" id="dexSave"></input>
                  </td>
                  <td>Constitution</td>
                  <td>
                    <input type="number" placeholder="0" id="conSave"></input>
                  </td>
                  <td>Intelligence</td>
                  <td>
                    <input type="number" placeholder="0" id="intSave"></input>
                  </td>
                  <td>Wisdom</td>
                  <td>
                    <input type="number" placeholder="0" id="wisSave"></input>
                  </td>
                  <td>Charisma</td>
                  <td>
                    <input type="number" placeholder="0" id="chaSave"></input>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="container">
            <h3>Armor</h3>
            <input
              type="text"
              id="armorTypes"
              placeholder="add armor proficiencies here..."
            ></input>
            <h3>Weapons</h3>
            <input
              type="text"
              id="weaponTypes"
              placeholder="add weapon proficiencies here..."
            ></input>
            <h3>Tools</h3>
            <input
              type="text"
              id="toolTypes"
              placeholder="add tool proficiencies here..."
            ></input>
            <h3>Languages</h3>
            <input
              type="text"
              id="languages"
              placeholder="add languages here..."
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharSheet;
