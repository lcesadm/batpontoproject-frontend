export const findAll = props => {
  let aux = [];

  fetch("http://10.0.2.2:8080/brands" , {
      method:'GET',
      headers: {
        'Accept' : 'application/json',
      }
  })
    .then(res => res.json())
      .then(data => {
        data.forEach(txt => {
          aux.push('Setor ' + txt.brandName);  
        });
      props.setListBrand(aux);
      })
      .catch(error => console.warn(error));
}

export const findByName = props => {
  fetch("http://10.0.2.2:8080/brands/findByName/" + props.name , {
    method:'GET',
    headers: {
      'Accept' : 'application/json',
    }
  })
    .then(res => res.json())
      .then(data => props.setBrandId(data))
      .catch(error => console.warn(error));
}

export const findTimeById = props => {
  fetch("http://10.0.2.2:8080/brands/findTimeById/" + props.brandId , {
    method:'GET',
    headers: {
      'Accept' : 'application/json',
    }
  })
    .then(res => res.json())
      .then(data => {
        props.setWorkBrandId(data[0]);
        props.setMark(data[1]);
      })
      .catch(error => console.warn(error));
}
