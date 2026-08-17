ui = false
disable_mlock = true

storage "raft" {
  path    = "/openbao/data"
  node_id = "ffax-openbao-1"
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 1
}

api_addr     = "http://openbao:8200"
cluster_addr = "http://openbao:8201"

telemetry {
  disable_hostname = true
}

