///<reference types="vss-web-extension-sdk" />

import { MessageHelper } from "./messageHelper";

export let generateDescriptionAction = {
    getMenuItems: () => {
        return [<IContributedMenuItem>{
            title: "Generate description",
            text: "Generate description",
            showText: true,
            action: async (actionContext: any) => {
                let workItemId = actionContext.workItemId;

                console.log(actionContext);
                if (workItemId) {
                    const hostDialogService = await VSS.getService<IHostDialogService>(VSS.ServiceIds.Dialog);
                    const dialog = await hostDialogService.openDialog(
                        `${extensionContext.publisherId}.${extensionContext.extensionId}.app-dialog`,
                        {
                            title: `Generate user story description`,
                            width: 500,
                            height: 600,
                            modal: true,
                            draggable: true,
                            resizable: true,
                            buttons: {
                                ok: {
                                    id: 'ok',
                                    text: 'OK',
                                    click: () => {
                                        dialog.close();
                                    },
                                    class: 'cta',
                                },
                                cancel: {
                                    id: 'cancel',
                                    text: 'Cancel',
                                    click: () => {
                                        dialog.close();
                                    },
                                    class: 'cta',
                                },
                            },
                        },
                        actionContext
                    );
                }
            }
        }];
    }
};

// Register context menu action provider
VSS.register(VSS.getContribution().id, generateDescriptionAction);

const extensionContext = VSS.getExtensionContext();

VSS.register(`${extensionContext.publisherId}.${extensionContext.extensionId}.generateDescriptionAction`, generateDescriptionAction);