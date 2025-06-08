import { AppDataSource } from "../../../data-source";
import { Application } from "../../../entities/Application";

export const applicationMutations = {
  setApplicantUnavailable: async (_: any, { applicationId }: { applicationId: string }) => {
    const appRepo = AppDataSource.getRepository(Application);
    const application = await appRepo.findOne({ where: { id: applicationId } });
    
    if (!application) {
      throw new Error("Application not found");
    }

    application.isUnavailable = true;
    return appRepo.save(application);
  },

  setApplicantAvailable: async (_: any, { applicationId }: { applicationId: string }) => {
    const appRepo = AppDataSource.getRepository(Application);
    const application = await appRepo.findOne({ where: { id: applicationId } });
    
    if (!application) {
      throw new Error("Application not found");
    }

    application.isUnavailable = false;
    return appRepo.save(application);
  }
}; 