export const findAllByUserId = props => {
  fetch("http://10.0.2.2:8080/hoursCard/findAllByUserId/" + props.id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
    .then(res => res.json())
      .then(data => props.setInfosDate(data))
      .catch(error => console.warn(error));
}

export const findAllByMonth = props => {
  let aux = [];
  
  fetch("http://10.0.2.2:8080/hoursCard/findAllByMonth/" + props.id + "/" + props.start + "/" + props.end, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
  })
    .then(res => res.json())
      .then(data => {
        data.forEach(value => {
          aux.push({hoursCardId: value[0], inputTime: value[1], outputTime: value[2], workedTime: value[3], extraTime: value[4], actualDate: value[5]});
        });
        props.setTableList(aux);
      })
      .catch(error => console.warn(error));
}

export const findByDate = props => {
  fetch("http://10.0.2.2:8080/hoursCard/findByDate/" + props.id + "/" + props.date, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
  })
    .then(res => res.json())
      .then(data => {
        props.setHoursCardId(data[0]);
        props.setInput(data[1]);
        props.setOutput(data[2]);
        props.setWorkedTime(data[3]);
        props.setExtraTime(data[4]);
        props.setFinished(data[5]);
        props.setCounter(data[6]);
      })
      .catch(() => props.createValues());
}

export const insertValues = props => {
  fetch("http://10.0.2.2:8080/hoursCard", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props.timeInfos)
  })
  .catch(error => console.warn(error));
}
