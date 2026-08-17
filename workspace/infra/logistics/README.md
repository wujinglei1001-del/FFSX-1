# FFAX logistics cells

The Karrio open-source server is not used as a shared FFAX multi-tenant database.
Each cell has an independent PostgreSQL database, Redis volume, API secret and
carrier plugin directory. FFAX assigns one tenant to a cell and the logistics
channel remains the only public API boundary.

Carrier credentials are referenced from OpenBao. They must never be written to
this directory, Compose files, Git, browser storage or FFAX connector settings.

The pinned Karrio core and community carrier plugins are LGPL-3.0. Karrio's
enterprise multi-tenancy code is not included.

