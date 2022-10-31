pipeline {
    agent {
        docker {
            image 'node:16.16'
            args '-u 0:0'
        }
    }
    environment {
        NODE_ENV = credentials('NODE_ENV')
        APP_PORT = credentials('APP_PORT')
        APP_NAME = credentials('APP_NAME')
        API_PREFIX = credentials('API_PREFIX')
        MONGO_USERNAME = credentials('MONGO_USERNAME')
        MONGO_PASSWORD = credentials('MONGO_PASSWORD')
        MONGO_DATABASE = credentials('MONGO_DATABASE')
        MONGO_HOST = credentials('MONGO_HOST')
        AWS_REGION = credentials('AWS_REGION')
        AWS_ACCOUNT_ID = credentials('AWS_ACCOUNT_ID')
        AWS_ECR_IMAGE = credentials('AWS_ECR_IMAGE')
    }

    stages {
        stage('install aws cli') {
            steps {
                echo "install aws cli"
                sh 'apt update'
                sh 'apt install sudo'
                // sh 'sudo apt install zip'
                // sh 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
                // sh 'unzip awscliv2.zip'
                sh 'sudo ./aws/install'
            }
        }
        stage('install docker') {
            steps {
                echo " install docker"
                sh 'apt update'
                sh 'apt install sudo'
                sh 'sudo apt update'
                sh 'sudo apt install docker-compose -y'
            }
        }
        stage('build image') {
            steps{
                withAWS(credentials: 'AWS_Shengni', region: 'ap-southeast-2') {
                    sh 'sudo apt update'
                    sh 'sudo apt-get install pass gnupg2 -y'
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com'
                    sh 'docker build -t 35middle-backend-image --build-arg NODE_ENV=${NODE_ENV} --build-arg APP_PORT=${APP_PORT} --build-arg APP_NAME=${APP_NAME} --build-arg API_PREFIX=${API_PREFIX} --build-arg MONGO_USERNAME=${MONGO_USERNAME} --build-arg MONGO_PASSWORD=${MONGO_PASSWORD} --build-arg MONGO_DATABASE=${MONGO_DATABASE} --build-arg MONGO_HOST=${MONGO_HOST} .'
                    sh 'docker tag 35middle-backend-image:latest $AWS_ECR_IMAGE'
                    sh 'docker push $AWS_ECR_IMAGE'
                }
            }
        }
    }
}