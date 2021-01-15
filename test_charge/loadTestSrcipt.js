import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let ErrorCount = new Counter("errors");

export let options = {
  stages: [
      { duration: '4m', target: 50 }, // simulate ramp-up of traffic from 1 to 50 users over 1 minute.
      { duration: '5m', target: 50 }, // stay at 50 users for 3 minutes
      { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    errors: ["count<5"]
  }
};

export default function () {
  var url = 'http://localhost:3001/users/login';
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

