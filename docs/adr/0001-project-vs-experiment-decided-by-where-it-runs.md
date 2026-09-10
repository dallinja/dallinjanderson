# Project vs Experiment is decided by where the thing runs

The site has both a Projects section and a Playground, and "experiment" was initially used for things in both. We decided the distinction is purely about _where the code runs_: an Experiment's code lives in this repository and renders on this site; a Project lives somewhere else and is only described here. Significance, size, and commercial success are explicitly irrelevant.

## Considered Options

- **By hosting (chosen)**: mechanical, needs no judgement call, and stays stable as the archive grows.
- **By weight** (Projects are significant, Experiments are toys): rejected because "significant" requires a judgement every time and would drift over years.
- **Collapse into one collection**: rejected as too sparse to communicate the difference between a shipped product and a Saturday toy.

## Consequences

A small, abandoned side project in its own repository is a **Project** with `status: archived`, not a Playground Experiment. This will look wrong to someone expecting "experiments" to mean "small things", which is the reason this ADR exists. A Project may embed an Experiment when one genuinely exists, but each entity has exactly one canonical URL.
