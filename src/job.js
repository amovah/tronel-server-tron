const jobs = {};

export function start(name, job, time) {
  jobs[name] = setTimeout(job, time);
}

export function stop(name) {
  clearTimeout(jobs[name]);
}
