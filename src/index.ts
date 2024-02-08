/* eslint-disable require-jsdoc */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {CloudTasksClient} from "@google-cloud/tasks";

const tasksClient = new CloudTasksClient();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(async (request, response) => {
  logger.info("Hello testFunction!");

  await cloudTask("your-project");

  response.send("Firebase function run OK with cloudTask client");
});

async function cloudTask(parent: string) {
  async function callListQueues() {
    const request = {
      parent,
    };

    // Run request
    const iterable = await tasksClient.listQueuesAsync(request);
    for await (const response of iterable) {
      console.log(response);
    }
  }

  callListQueues();
  // [END cloudtasks_v2_generated_CloudTasks_ListQueues_async]
}
