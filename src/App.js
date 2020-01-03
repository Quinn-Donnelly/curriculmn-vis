import React, {useState} from 'react';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import curriculums from './data/curriculum';

let skills = new Set();
let curriculum = Object.keys(curriculums);
curriculum.sort();
let skillMap = new Map();
for (let entry of Object.entries(curriculums)) {
  entry[1].forEach((skill) => {
    skills.add(skill);
  });
  skillMap.set(entry[0], new Set(entry[1]));
}

function App() {
  let [selectedList, setSelectedList] = useState();
  let [currentSkillSet, updateCurrentSkillSet] = useState(skills);

  function switchActive(event) {
    console.log(event.currentTarget.id);
    setSelectedList(event.currentTarget.id);
    updateCurrentSkillSet(skillMap.get(event.currentTarget.id));
  }

  let listItems = [];
  curriculum.forEach((name) => listItems.push(
      <Paper>
      <ListItem button key={name} id={name} onMouseOver={switchActive} selected={selectedList === name}>
          <ListItemText primary={name} />
      </ListItem></Paper>
  ));

  let skillChips = [];
  skills.forEach((skill) => {
    let hideClass = currentSkillSet.has(skill) ? "" : "fade";
    skillChips.push(
        <Chip component="button" label={skill} key={skill} className={hideClass + " chip"}/>
    )
  });

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs>
          <List component="nav">
            {listItems}
          </List>
        </Grid>
        <Grid item xs>
          {skillChips}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
