#!/bin/bash
echo $(whoami)

echo $APPLICATION_NAME
cd ~/$APPLICATION_NAME

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo $DEPLOYMENT_GROUP_NAME
pm2 startOrReload ecosystem.config.js --env $DEPLOYMENT_GROUP_NAME

# if [ "$DEPLOYMENT_GROUP_NAME" -eq "development" ]
# then
#   pm2 start npm -- dev
# else
#   pm2 start npm -- start
# fi