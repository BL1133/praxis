/* eslint-disable @typescript-eslint/no-explicit-any */
export function IsOwnProject(
  userData: { user: { id: any } },
  projectData: { createdBy: { id: any } },
) {
  return (
    userData?.user &&
    (typeof projectData?.createdBy === 'object'
      ? projectData?.createdBy?.id === userData?.user?.id
      : projectData?.createdBy === userData?.user?.id)
  );
}
