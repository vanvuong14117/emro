package smartsuite.app.bp.approval.mail;

import com.google.common.collect.Maps;
import org.springframework.stereotype.Service;
import smartsuite.app.bp.approval.repository.ApprovalMailRepository;
import smartsuite.app.common.mail.data.TemplateMailData;
import smartsuite.app.common.mail.strategy.MailStrategy;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Map;

/**
 * 반려 시점에 기안자에게 메일 발송
 */
@Service
public class ApprovalReturnMailStrategy implements MailStrategy {
	
	@Inject
	ApprovalMailRepository approvalMailRepository;
	
	@Override
	public String getEmailTemplateId() {
		return "APPROVAL_RETURN_MAIL";
	}
	
	@Override
	public TemplateMailData getTemplateMailData(String appId, Map<String, Object> data) throws Exception {
		TemplateMailData templateMailData = TemplateMailData.getInstance();
		
		Map param = Maps.newHashMap();
		param.put("apvl_uuid", appId);
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault());
		
		Map approvalInfo = approvalMailRepository.findApprovalInfo(param);
		Map returnInfo = approvalMailRepository.findApprovalReturnInfo(param);
		
		approvalInfo.put("apvl_rptg_dttm", simpleDateFormat.format(approvalInfo.get("apvl_rptg_dttm")));
		approvalInfo.put("agree_ret_name", returnInfo.get("agree_ret_name"));
		approvalInfo.put("apvl_dttm", simpleDateFormat.format(returnInfo.get("apvl_dttm")));
		approvalInfo.put("apvl_opn", returnInfo.get("apvl_opn"));
		templateMailData.setParameter(approvalInfo);
		templateMailData.addReceiver(approvalMailRepository.findApprovalDrafterInfo(param));
		
		return templateMailData;
	}
}
