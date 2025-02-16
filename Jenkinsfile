pipeline{
    agent any
    stages{
        stage("Code Clone"){
            steps{
                echo "Clonging the code"
                git url:"https://github.com/Shubham-Patel07/Shubham-Patel---Frontend-Developer.git", branch:"main"
            }
        }
        stage("Build"){
            steps{
                echo "Building the image"
                sh "docker build -t swiggy-app ."
            }
        }
        stage("Push to DockerHub"){
            steps{
                echo "Pushing the Image to Docker Hub"
                withCredentials([usernamePassword(credentialsId:"dockerHub", passwordVariable:"dockerHubPass", usernameVariable:"dockerHubUser")]){
                    sh "docker tag swiggy-app ${env.dockerHubUser}/swiggy-app:latest"
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker push ${env.dockerHubUser}/swiggy-app:latest"
                }
            }
        }
        stage("Deploy"){
            steps{
                echo "Deploying the Container"
                sh "docker-compose down && docker-compose up -d "
            }
        }
    }
}
