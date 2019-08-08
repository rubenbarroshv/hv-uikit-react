pipeline {
    
    agent { label 'non-master' }
    tools {nodejs "node-js-11.10-auto"}
    options { 
        timestamps () 
        timeout(time: 20, unit: 'MINUTES') 
        disableConcurrentBuilds()
    }
    
    parameters {
        booleanParam(name: 'skipBuild', defaultValue: false, description: 'when true, skip build.')
        booleanParam(name: 'skipAutomation', defaultValue: false, description: 'when true, skip automation.')
        booleanParam(name: 'skipTest', defaultValue: false, description: 'when true, skip tests.')
        booleanParam(name: 'skipDeploy', defaultValue: true, description: 'when true, skip deploy to nexus.')
        choice(choices: ['prerelease', 'prepatch', 'patch', 'preminor', 'minor', 'premajor', 'major'], description: 'What type of deploy.', name: 'deploy')
        choice(choices: ['#ui-kit-eng-ci','#ui-kit-eng', '#ui-kit'], description: 'What channel to send notification.', name: 'channel')
    }
   
    stages {
        stage('Build') {
            when {
                expression { !params.skipBuild }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    sh 'npm ci --silent'
                    sh 'npm run bootstrap'
                }
            }
        }
        stage('Build Automation') {
            when {
                expression { !params.skipAutomation }
            }
            steps {
                script {
                    withNPM(npmrcConfig: 'hv-ui-nprc') {
                        def dockerRegistry = 'https://nexus.pentaho.org:8002'
                        def dockerRegistryCredentialsId = 'buildguynexus'
                        def dockerImageTag = "${GIT_BRANCH}.${BUILD_NUMBER}"
                        docker.withRegistry(dockerRegistry, dockerRegistryCredentialsId) {
                            def automationImage = docker.build("hv/uikit-react-automation-storybook:${dockerImageTag}", "-f ./automation/storybook/Dockerfile .")
                            automationImage.push("${dockerImageTag}")
                        }    
                    } 
                }
            }
        }
        stage('Test') {
            when {
                expression { !params.skipTest }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    script {
                        def RESULT_LINT = sh returnStatus: true, script: 'npm run lint'
                        if ( RESULT_LINT != 0 ) {
                            currentBuild.result = 'UNSTABLE'
                        }
                        def RESULT_TESTS = sh returnStatus: true, script: 'npm run test'
                        if ( RESULT_TESTS != 0 ) {
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                    junit '**/junit.xml'
                }
            }
        }
        stage('Deploy') {
            when {
                expression { !params.skipDeploy && !env.CHANGE_ID }
            }
            steps {
                withNPM(npmrcConfig: 'hv-ui-nprc') {
                    withCredentials([string(credentialsId: 'github-api-token', variable: 'GH_TOKEN')]) {
                        sshagent (credentials: ['github-buildguy']) {
                            sh "git checkout ${env.BRANCH_NAME}"
                            sh 'cp .npmrc ~/.npmrc'
                            sh 'git status'
                            sh "npm run publish:${deploy}"
                        }
                    }
                }
            }  
        }
    }
    
    post {
        always {
            script {
                if ( currentBuild.currentResult == "SUCCESS" ) {
                    slackSend channel: "${params.channel}", color: "good", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was successful"
                }
                else if( currentBuild.currentResult == "UNSTABLE" ) { 
                    slackSend channel: "${params.channel}", color: "warning", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} was unstable"
                }
                else { 
                    slackSend channel: "${params.channel}", color: "danger", message: "${env.JOB_NAME} - ${env.BUILD_NUMBER} failed!"
                }
            }
        }
    }
}
