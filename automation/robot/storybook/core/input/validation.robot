*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${tests}input--controlled-state
...           AND    Wait Until Element Is Visible    ${input}


*** Test Cases ***
present warning controlled by outside
    Element Should Not Be Visible               ${warning}
    click Button                                Error
    Element Should be visible                   ${warning}
    click Button                                Clear
    Element Should Not Be Visible               ${warning}


*** Variables ***
${input}                 css:input[type=text]
${warning}               css:#validation-description-notification
