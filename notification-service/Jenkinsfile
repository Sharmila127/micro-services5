pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Sharmila127/notification-service.git'   // 🔗 Replace with your actual repo
        IMAGE_NAME = 'notification-service'
        CONTAINER_NAME = 'notification-service'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '🔹 Checking out source code from private GitHub repo...'
                // Make sure Jenkins has a credential with ID: github_credentials
                git branch: 'main',
                    url: "${REPO_URL}",
                    credentialsId: 'github_credentials'
            }
        }

        stage('Clean Old Containers & Images') {
            steps {
                script {
                    echo '🧹 Cleaning old Docker containers and images...'
                    sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker image rm ${IMAGE_NAME}:latest || true
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🐳 Building Docker image for Notification Service...'
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Run with Docker Compose') {
            steps {
                script {
                    echo '🚀 Starting Notification Service and dependencies using docker-compose...'
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Verify Running Container') {
            steps {
                script {
                    echo '🔍 Checking running container status...'
                    sh 'docker ps | grep ${CONTAINER_NAME} || true'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Notification Service deployed successfully via Jenkins!'
        }
        failure {
            echo '❌ Jenkins pipeline failed. Please check logs.'
        }
    }
}
