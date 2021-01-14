import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let ErrorCount = new Counter("errors");

export let options = {
  stages: [
      { duration: '15s', target: 10 }, // below normal load
      { duration: '30s', target: 10 },
      { duration: '10s', target: 20 }, // normal load
      { duration: '30s', target: 20 },
      { duration: '10s', target: 30 }, // around the breaking point
      { duration: '30s', target: 30 },
      { duration: '10s', target: 40 }, // beyond the breaking point
      { duration: '30s', target: 40 },
      { duration: '10s', target: 0 },
  ],
  thresholds: {
    errors: ["count<5"]
  }
};

export default function () {
  var url = 'http://localhost:3000/users/login';
  var payload = JSON.stringify({
    email: 'jane@gmail.com',
    password: 'azertyuiop'
  });
  

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let result = http.request("POST",url, payload, params);
  let success = check(result, { 'status was 200': (r) =>{
       //console.log(r.status);
       //console.log(JSON.stringify(r.body));
       return r.status === 200
    } 
  });
  if(!success) {
    ErrorCount.add(1);
  }

  sleep(2);
}

