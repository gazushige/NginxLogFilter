# NGINX Access Log Filtering Script

This script is designed to filter NGINX access log files, removing lines older than a specified number of days and keeping only the lines within the specified number of days.

## Usage

1. Clone this repository.

2. Place your NGINX access log file (usually named `access.log`) in an appropriate location.

3. Ensure Node.js is installed on your local environment.

4. Run the following command in your terminal to execute the script:

   ```bash
   node filter-nginx-access-log.js
