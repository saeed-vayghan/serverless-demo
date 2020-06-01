**An open source project to learn how a modern serverless application works.**
<br><br>

**Project Structure**
  * [x] Docker (Local MongoDB)
  * [x] GIT
  * [x] Models - Routes - Controllers - Plugins
  * [x] Unit-Test
  * [x] Functional-Test
  * [x] Security check through snyk.io
  * [x] Code Coverage ([screen shot](coverage.png))
  * [x] API-DOC ([screen shot](api-doc.png))
  * [x] Logging (an abstract layer is added)
  * [x] Monitoring (an abstract layer is added)
  * [x] Caching (a simple caching layer is added to reduce WorldWeather API calls)
  * [x] Handle CORS (an abstract layer is added)
  * [x] Query sanitizer
  * [x] package.json
  * [x] npm-shrinkwrap.json
  * [x] Esling
  * [x] Naming-Tagging (Asset-Inventory)
  * [x] Env Variables
  * [x] Documentaion
  * [x] Manual test with CURL ([screen shot](samples.png))
  * [ ] CI-CD
<hr>

**Serverless Framework**
  * [x] Serverless Configuration
  * [x] Serverless Offline
  * [x] Serverless Deploy
<hr>

**Third Party**
  * [x] Config MongoDB Atlas
  * [x] WorldWeather APIs
<hr>

**AWS**
  * [x] AWS-Zone (eu-west-1 / main region)
  * [x] AWS-IAM
  * [ ] AWS-Secrets-Manager
  * [ ] AWS-API-Gateway (use authorizer for api gateway)
<hr>

**Security checklist to consider - Further development**
* AWS Least Privilege Principle (sample: IAM Role - don't use the wildcard * for resources!)
* Mongo Least Privilege Principle (sample: user with Read-Only access)
* Third-Party Packages (if there is a package with too many dependencies, you'd better write your package)
* Lock dependencies with npm shrinkwrap
* Protect User Data (encrypting DB, HTTPS, ...)
* Logging (failed logins, DB interactions, ...)
* Authorizes APIs
* Rotate keys (use services like AWS Secrets-Manager)
* Separate development and production environments (dockerize your development dependencies)
* Serverless Framework
* Different IAM-Roles for each Function
* Escape Input / Filter Output

**Resource Management**
* Protect yourself from DoS Attacks (Rate-limiters, Debouncers, and Throttlers)
* AWS Pricing (how to reduce API calls)
<hr>

**Optimization - To Scale Up**
* Keep your Lambda function warm with CloudWatch ping events
* Lambda tagging
* AWS Pricing (how to reduce API calls)
* Tweaking computing resources based on some custom benchmarks
* Make balance between CPU cores and allocated Memory
* Use serverless-plugin-optimize in order to reduce the package size
* AWS X-Ray helps developers analyze and debug
* Use SQS FIFO queues to handle undelivered messages or any other messageing approaches
<hr><br><br>



**Install dependencies**
```bash
npm i

# setun snyk
snyk test
snyk wizard

npm shrinkwrap
```

**Config your AWS profile**
```bash
serverless config credentials --provider aws --key <your-key> --secret <your-secret> --overwrite <your-profile-name>
```

**Run docker containers on your local machint:**
```bash
docker-compose up
```

**Login to MongoDB container**
```bash
docker exec -it mongodb-vopak bash
```

**Config your local MongoDB**
```bash
mongo 127.0.0.1

use admin
db.auth('admin', 'admin')

use db-demo
db.createUser(
  {
    user: "username",
    pwd: "password",
    roles: [ { role: "dbOwner", db: "db-demo" } ]
  }
)

db.auth('username', 'password')
```

**Generate API documentation**
```bash
apidoc -i app/ -o /docs
```

**Run Eslint**
```bash
npx eslint .
```

**Run application in offline mode**
```bash
npm start
```

**Deploy application**
```bash
serverless deploy -v
```

**Run unit tests**
```bash
mocha test/unit/index.js --exit
```

**Run functional tests**
```bash
sls invoke test --path test/functional/ --exit
```

**Generate code coverage report**
```bash
# cli output
nyc nyc mocha test/unit/ --exit

# html output
nyc nyc --reporter=html mocha test/unit/ --exit
```